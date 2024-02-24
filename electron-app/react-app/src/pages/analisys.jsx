import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../static/css/Analisys.css"

export default function Analisys(){
    return(
        <div className="analisys">
            <div className="analisys-head">
                <div className="analisys-link">
                    <form action="" className="form-analisys">
                        <div className="form-head">
                            <div className="div-table">
                                <NavLink to="table">
                                    {/* <i class="fa-solid fa-table"></i>     */}
                                    <div className="name">table</div>
                                </NavLink>
                            </div>  
                            <div className="div-tree">
                                <NavLink to="tree">
                                    {/* <i class="fa-solid fa-folder-tree"></i> */}
                                    <div className="name">tree</div>
                                </NavLink>
                            </div>
                            <div className="div-graph">
                                <NavLink to="graph">
                                    {/* <i class="fa-solid fa-chart-bar"></i>     */}
                                    <div className="name">graph</div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="form-body">
                            <div>
                                <input type="text" placeholder="Search"/>
                            </div>
                            <div>
                                <input type="button" value="Search" placeholder="Search"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="analisys-body">
                <Outlet />
            </div>
        </div>
    )
}