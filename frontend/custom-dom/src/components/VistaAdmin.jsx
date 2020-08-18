import React, { useState, useEffect } from 'react';
import { db, functions } from '../firebase';

const VistaAdmin = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();

    }, []);

    const fetchUsuarios = async () => {
        try {
            const res = await db.collection('usuariosCustom').get();
            const arrayUsuarios = res.docs.map(doc => doc.data());
            setUsuarios(arrayUsuarios);
        } catch (error) {
            console.log(error);
        }
    };

    const administrador = email => {
        if (!email.trim()) {
            return console.log('email vacio');
        } //No es necesario :)
        const agregarRol = functions.httpsCallable('agregarAdministrador'); //esta es la funcion que nos deja leer el be
        agregarRol({ email: email })
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    console.log('no tiene permisos');
                    return;
                }
                db.collection('usuariosCustom').doc(email).update({ rol: 'admin' })
                    .then(user => {
                        console.log('usuario modificado rol administrador');
                        fetchUsuarios();
                    });
            });
    };

    const crearAutor = email => {
        const agregarRol = functions.httpsCallable('crearAutor'); //esta es la funcion que nos deja leer el be
        agregarRol({ email: email })
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    console.log('no tienes permisos');
                    return;
                }
                db.collection('usuariosCustom').doc(email).update({ rol: 'autor' })
                    .then(user => {
                        console.log('usuario modificado, rol de autor');
                        fetchUsuarios();
                    });
            });

    };

    const eliminarAutor = email => {
        const agregarRol = functions.httpsCallable('eliminarAutor'); //esta es la funcion que nos deja leer el be
        agregarRol({ email: email })
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    console.log('no tienes permisos');
                    return;
                }
                db.collection('usuariosCustom').doc(email).update({ rol: 'invitado' })
                    .then(user => {
                        console.log('usuario modificado a invitado');
                        fetchUsuarios();
                    });
            });
    };

    return (
        <div>
            <h3>Administración de usuarios</h3>
            {
                usuarios.map(usuario => (
                    <div key={usuario.uid} className='mb-2'>
                        {usuario.email} - rol: {usuario.rol}
                        <button
                            className='btn btn-danger mx-2'
                            onClick={() => administrador(usuario.email)}
                        >Administrador</button>

                        <button
                            className='btn btn-success mx-2'
                            onClick={() => crearAutor(usuario.email)}
                        >Autor</button>
                        <button
                            className='btn btn-info mx-2'
                            onClick={() => eliminarAutor(usuario.email)}
                        >Invitado</button>

                    </div>

                ))
            }
        </div>
    );
};

export default VistaAdmin;
