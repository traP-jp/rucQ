package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"github.com/traP-jp/rucQ/backend/handler"
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	e := echo.New()
	// Echo は Web フレームワークと呼ばれるもので、データベースとの接続・バックエンドの API サーバー起動をやってくれる
	// echo.New() は API サーバーの初期化

	if l, ok := e.Logger.(*log.Logger); ok {
		l.SetHeader("${level}")
		// ヘッダーとは「INFO 2025/02/01 12:00:00 サーバーを起動しました」における INFO みたいなやつ
	}

	// var x any = "hello"
	// s, ok := x.(string)

	// ↑ めちゃくちゃ分かりやすい GPT くんの例示
	// 変数 x という箱は any というインターフェース型だが、x に入っている値は string 型
	// x.(string) は x に入っている値が string 型であるかどうかをチェックし、入っているなら s に string 型として代入する
	// 今回の l, ok := e.Logger.(*log.Logger) の場合、変数 e.Logger に入っている値が *log.Logger であるかどうかを確認している

	// https://pkg.go.dev/github.com/labstack/echo/v4#Echo によると、
	// e は echo 型なので e.Logger は echo.Logger 型である。これはインターフェース型だが、常にメソッド SetHeader を持つことは保証されている
	// とするとなぜ l.SetHeader の呼び出しに条件（しかも *log.Logger という別のところから引っ張ってきた型）を設けているのだろう？

	// echo におけるログ出力のお約束と捉えて深掘りしないのも手ではあるが…

	godotenv.Load(".env", "bot.env")

	// データベースは SQL を書くことで操作（情報の読み出し・書き換え）する情報の倉庫
	// たとえばデータベースに以下のような型で定義されるメッセージを保存するとする
	//
	// type Message struct { id int   Author string   CreatedAt string   Content string   Replies []Reply }
	// type Reply   struct { id int   Author string   CreatedAt string   Content string }
	//
	// メッセージをデータベースに保存するにあたり、大まかに 2 つの方法が考えられる
	//
	// 1. Message 型を保存するためのテーブルを用意し、ID, Author, CreatedAt, Content, Replies という 5 つのフィールドを設ける
	//    Replies にはそのメッセージにつく返信の情報を全部 JSON 型文字列として保存する
	//    id = 3 のメッセージが欲しいときは、このテーブルから ID = 3 であるものを探す。id はこのテーブルの key なので探索は O(log N)
	//    リプライは JSON をパースして得る。もしリプライが大量にあれば、ここでめっちゃ時間を食うかもしれない
	//
	// 2. Message 型を保存するためのテーブルを用意し、ID, Author, CreatedAt, Content という 4 つのフィールドを設ける
	//    それとは別で Reply 型を保存するためのテーブルを用意し、ID, Author, CreatedAt, Content, MessageID という 5 つのフィールドを設ける
	//    id = 3 のメッセージが欲しいときは、Messages テーブルから id = 3 であるものを探し、
	//    Replies テーブルから MessageID = 3 であるものを全て探す。素直にやるなら O(N)
	//
	// 一見するとメッセージを一つ探索するのにかかる時間は 2 の方が断然高いように見えるが、
	//     CREATE INDEX idx_message_id ON Replies(MessageID);
	// と SQL を書くことで「Replies テーブルの MessageID カラムに対してインデックスを作成」することができ、検索は O(log N) でできるようになり、スピードは 1 と遜色ない
	//
	// 2 は 1 と比べてスケーラビリティやリプライの検索性にも優れているので、1 より 2 の方が断然よく採用される
	// このように、各型に対して専用のテーブルを設け、テーブル同士の関係によってオブジェクト群を表現する方法を「リレーショナルデータベース」と呼ぶ
	// リレーショナルデータベースにおいては基本的に、Message と Reply のような「1 vs 多」の構造である場合、
	// 「1」に相当するテーブルのレコードの ID を 「多」に相当するテーブルのレコードに置いておく

	user := os.Getenv("NS_MARIADB_USER")
	password := os.Getenv("NS_MARIADB_PASSWORD")
	host := os.Getenv("NS_MARIADB_HOSTNAME")
	database := os.Getenv("NS_MARIADB_DATABASE")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8mb4&parseTime=True&loc=Asia%%2FTokyo", user, password, host, database)
	db, err := gorm.Open(mysql.Open(dsn)) // dsn はデータベースへの接続に必要な情報をまとめた string
	if err != nil {
		e.Logger.Fatal(err)
	}

	// ORM はデータベースを「リレーショナルデータベース」として扱うことを補助してくれるツールである
	// sqlx と gorm は Go における代表的な ORM（他にも beego とか色々あるらしい）
	// https://qiita.com/ryotaro_tech/items/f6dda5ef0a67ae2726d4

	// データベースを操作するには SQL 言語によってクエリを書く必要があるが、
	// Go には標準で SQL によるデータベース操作をサポートする sql というライブラリが積まれている。sql.Open() の返り値は *sql.DB 型
	// sqlx と mysql はともに sql の拡張ライブラリである
	//
	// sqlx ... 構造体のマッピング（db.Get() によってデータベースから直接構造体を取得できる）など便利機能が実装されている
	// mysql ... データベース管理システム「mySQL」に特化した機能が実装されている（名前からの安易な演繹）
	//
	// 全て sql の拡張なので、全てに Open メソッドが実装されており、返り値も *sql.DB 型またはその拡張である
	// つまり、sql.Open() と sqlx.Open() と mysql.Open() の根本は同じもの
	// sqlx の時 db, err := sqlx.Open("mysql", dsn) という簡素な呼び出しだったのはそのため

	// 一方、gorm は 独自にデータベース操作の抽象化を提供する
	// つまり、gorm を使えば SQL 文を書く必要がなくなり、データベース操作をすべて Go 上の関数呼び出しとして表現できる
	// gorm.Open(mysql.Open(dsn)) という呼び出し方は、gorm の関数が mysql.DB 上の関数を分かりやすく翻訳して提供していることを示唆している

	if err := db.AutoMigrate(model.GetAllModels()...); err != nil {
		e.Logger.Fatal(err)
	}

	// このリポジトリ内の model パッケージをインポートしてあり、model.go に定義されている GetAllModels を呼び出す
	// GetAllModels は model に定義されている全ての構造体のポインタの配列を返す
	// Migrate はこれらの構造体のそれぞれについてデータベース上にテーブルを作成する処理

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"http://localhost:5173", // フロントエンド
			"http://localhost:8081", // Swagger UI
		},
	}))

	// アクセスを許可するオリジン（ドメイン localhost + ポート 8081）のリストを与える
	// 異なるドメインからのアクセスを受け付けることは不正アクセスの危険を伴うので、基本的には同一オリジンポリシーに従い外部からのアクセスを受け付けない
	// やるとしても慎重に。CORS（オリジン間ソース共有）は、異なるドメインからのアクセスを受け付けるための通信システム
	// CORS を用いて、サーバー側がリクエストに対してどのオリジンからのリクエストを許可するかを指定できる

	e.POST("/api/traq-events", handler.TraqEventHandler)
	// "/api/traq-events" に POST リクエストが飛んできたときに限り handler.TraqEventHandler 関数が実行される
	// 同様の HTTP メソッドの名を冠する大文字関数は api.gen.go の最後尾で大量に呼ばれている

	handler.RegisterHandlers(e, handler.NewServer(db))
	// handler.NewServer(db) は Server > Repository > *gorm.DB という構造体を返す

	e.Logger.Fatal(e.Start(os.Getenv("RUCQ_BACKEND_ADDR")))
	// e.Start によってサーバーが起動する
	// e.Start がブロックするので、もしこの処理が終了したら大概は異常終了。自動的に FATAL として扱ってログを書く
}
