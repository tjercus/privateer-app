import React from "react";
// import {useAppDispatch, useAppSelector} from "../../app/hooks";

export const PlanetFormView = () =>
  <form className="form-horizontal">
    <div className="form-group">
      <label htmlFor="inputEmail1" className="col-sm-3 control-label">Email</label>
      <div className="col-sm-9">
        <input type="email" className="form-control" id="inputEmail1" placeholder="Email"/>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="inputPassword1" className="col-sm-3 control-label">Password</label>
      <div className="col-sm-9">
        <input type="password" className="form-control" id="inputPassword1" placeholder="Password"/>
      </div>
    </div>
    <div className="form-group">
      <div className="col-md-9 offset-md-3">
        <div className="checkbox">
          <input type="checkbox" id="checkbox1"/>
          <label htmlFor="checkbox1">Remember me</label>
        </div>
      </div>
    </div>
    <div className="form-group">
      <div className="col-md-9 offset-md-3">
        <button type="submit" className="btn">Sign in</button>
      </div>
    </div>
  </form>