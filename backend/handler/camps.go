package handler

import "github.com/labstack/echo/v4"

func (s *Server) GetCamps(e echo.Context) error {
	return nil
}

func (s *Server) PostCamp(e echo.Context, params PostCampParams) error {
	return nil
}

func (s *Server) GetCamp(e echo.Context, campID CampId) error {
	return nil
}

func (s *Server) PutCamp(e echo.Context, campID CampId, params PutCampParams) error {
	return nil
}
