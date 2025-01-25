/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/camps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 合宿の一覧を取得 */
        get: operations["getCamps"];
        put?: never;
        /** 合宿を作成 */
        post: operations["postCamp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/camps/{camp_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 合宿の詳細を取得 */
        get: operations["getCamp"];
        /** 合宿を更新 */
        put: operations["putCamp"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** イベントの一覧を取得 */
        get: operations["getEvents"];
        put?: never;
        /** イベントを作成 */
        post: operations["postEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/events/{event_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** イベントの詳細を取得 */
        get: operations["getEvent"];
        /** イベントを更新 */
        put: operations["putEvent"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/events/{event_id}/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** イベントに参加 */
        post: operations["registerEvent"];
        /** イベントへの参加をキャンセル */
        delete: operations["unregisterEvent"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/events/{event_id}/participants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** イベントの参加者一覧を取得 */
        get: operations["getParticipants"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 自分の情報を取得 */
        get: operations["getMe"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/question_groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 質問グループの一覧を取得 */
        get: operations["getQuestionGroups"];
        put?: never;
        /** 質問グループを作成 */
        post: operations["postQuestionGroup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/questions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 質問の一覧を取得 */
        get: operations["getQuestions"];
        put?: never;
        /** 質問を作成 */
        post: operations["postQuestion"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/questions/{question_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 質問の詳細を取得 */
        get: operations["getQuestion"];
        /** 質問を更新 */
        put: operations["putQuestion"];
        post?: never;
        /** 質問を削除 */
        delete: operations["deleteQuestion"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/options": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 選択肢を作成 */
        post: operations["postOption"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/options/{option_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 選択肢を更新 */
        put: operations["putOption"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/answers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 回答を作成 */
        post: operations["postAnswer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/answers/{answer_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 回答を更新 */
        put: operations["putAnswer"];
        post?: never;
        /** 回答を削除 */
        delete: operations["deleteAnswer"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/staffs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 合宿係の一覧を取得 */
        get: operations["getStaffs"];
        put?: never;
        /** 合宿係を追加 */
        post: operations["postStaff"];
        /** 合宿係を削除 */
        delete: operations["deleteStaff"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Camp: {
            id: number;
            display_id: string;
            name: string;
            is_draft: boolean;
            description: string;
        };
        PostCampRequest: {
            display_id: string;
            name: string;
            is_draft: boolean;
            description: string;
        };
        Event: {
            id: number;
            name: string;
            description: string;
            location: string;
            /** Format: date-time */
            time_start: string;
            /** Format: date-time */
            time_end: string;
            camp_id: number;
            organizer_traq_id: string;
            by_staff: boolean;
        };
        PostEventRequest: {
            name: string;
            description: string;
            location: string;
            /** Format: date-time */
            time_start: string;
            /** Format: date-time */
            time_end: string;
            camp_id: number;
            create_as_staff: boolean;
        };
        User: {
            traq_id: string;
            is_staff: boolean;
        };
        QuestionGroup: {
            id: number;
            name: string;
            description: string | null;
            /** Format: date-time */
            due: string;
            questions: components["schemas"]["Question"][];
        };
        PostQuestionGroupRequest: {
            name: string;
            description: string | null;
            /** Format: date-time */
            due: string;
        };
        Question: {
            id: number;
            question_group_id: number;
            title: string;
            description: string | null;
            /** @enum {string} */
            type: "single" | "multiple" | "free_text" | "free_number";
            is_public: boolean;
            is_open: boolean;
            options?: components["schemas"]["Option"][] | null;
        };
        PostQuestionRequest: {
            question_group_id: number;
            title: string;
            description: string;
            /** @enum {string} */
            type: "single" | "multiple" | "free_text" | "free_number";
            is_public: boolean;
            is_open: boolean;
        };
        Option: {
            id: number;
            question_id: number;
            content: string;
        };
        PostOptionRequest: {
            content: string;
        };
        Answer: {
            id: string;
            question_id: number;
            user_traq_id: string;
            content?: string | null;
        };
        PostAnswerRequest: {
            question_id: number;
            content: string;
        };
        PostStaffRequest: {
            traq_id: string;
        };
    };
    responses: {
        /** @description No Content */
        NoContent: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Bad Request */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message?: string;
                };
            };
        };
        /** @description Forbidden */
        Forbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message?: string;
                };
            };
        };
        /** @description Not Found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message?: string;
                };
            };
        };
        /** @description Conflict */
        Conflict: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message?: string;
                };
            };
        };
        /** @description Internal Server Error */
        InternalServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @example Internal server error */
                    message?: string;
                };
            };
        };
    };
    parameters: {
        /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
        "X-Forwarded-User": string;
        /** @description 合宿ID */
        CampId: number;
        /** @description イベントID */
        EventId: number;
        /** @description 質問ID */
        QuestionId: number;
        /** @description 選択肢ID */
        OptionId: number;
        /** @description 回答ID */
        AnswerId: number;
        /** @description 合宿係のtraQ ID */
        StaffId: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getCamps: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Camp"][];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    postCamp: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCampRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostCampRequest"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            409: components["responses"]["Conflict"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getCamp: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 合宿ID */
                camp_id: components["parameters"]["CampId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Camp"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    putCamp: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 合宿ID */
                camp_id: components["parameters"]["CampId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCampRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Camp"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getEvents: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event"][];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    postEvent: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostEventRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description イベントID */
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    putEvent: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description イベントID */
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostEventRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    registerEvent: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description イベントID */
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["NoContent"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
            500: components["responses"]["InternalServerError"];
        };
    };
    unregisterEvent: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description イベントID */
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["NoContent"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getParticipants: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description イベントID */
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"][];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getMe: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    getQuestionGroups: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuestionGroup"][];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    postQuestionGroup: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostQuestionGroupRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QuestionGroup"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getQuestions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"][];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    postQuestion: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostQuestionRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getQuestion: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 質問ID */
                question_id: components["parameters"]["QuestionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    putQuestion: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 質問ID */
                question_id: components["parameters"]["QuestionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostQuestionRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteQuestion: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 質問ID */
                question_id: components["parameters"]["QuestionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["NoContent"];
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    postOption: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostOptionRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Option"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["InternalServerError"];
        };
    };
    putOption: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 選択肢ID */
                option_id: components["parameters"]["OptionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostOptionRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Option"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    postAnswer: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostAnswerRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Answer"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalServerError"];
        };
    };
    putAnswer: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 回答ID */
                answer_id: components["parameters"]["AnswerId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostAnswerRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Answer"];
                };
            };
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteAnswer: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path: {
                /** @description 回答ID */
                answer_id: components["parameters"]["AnswerId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["NoContent"];
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getStaffs: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"][];
                };
            };
            500: components["responses"]["InternalServerError"];
        };
    };
    postStaff: {
        parameters: {
            query?: never;
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostStaffRequest"];
            };
        };
        responses: {
            204: components["responses"]["NoContent"];
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
    deleteStaff: {
        parameters: {
            query: {
                /** @description 合宿係のtraQ ID */
                staff_id: components["parameters"]["StaffId"];
            };
            header: {
                /** @description ログインしているユーザーのtraQ ID（NeoShowcaseが自動で付与） */
                "X-Forwarded-User": components["parameters"]["X-Forwarded-User"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: components["responses"]["NoContent"];
            400: components["responses"]["BadRequest"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalServerError"];
        };
    };
}
