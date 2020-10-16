import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'


export default function Register(){




    return (
        <div className="contenido">
        <div className="row">
        <div className="col-md-8 offset-md-2">
            <form>
                <div className="form-heading tect-center">
                    <div className="title">Registrate</div>
                    <p className="title-description">¿Ya tienes una cuenta?
                    <Link to='/logIn'>Inicia sesion</Link>
                    </p>
                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Nombre</label>
                        <input type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label">Apellido</label>
                        <input type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Usuario</label>
                        <input type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label label-required"> Email</label>
                        <input type="email"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="floatin-label">Contraseña</label>
                        <input type="password"/>
                    </div>
                    <div className="col-md-6">
                        <label className="floatin-label">Confirme contraseña</label>
                        <input type="password"/>
                    </div>
                </div>
                
                <div className="col-md-12">
                    <button className="adam-button">Crear cuenta</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    )
} 