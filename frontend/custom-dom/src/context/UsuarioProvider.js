import React, { createContext, useState, useEffect } from 'react';
import { auth, db, firebase } from '../firebase';

export const UsuarioContext = createContext();

const UsuarioProvider = (props) => {

    const dataUsuarioInicial = {
        email: null, uid: null, activo: null
    };

    //Detectar su el usuario esta registrado o nop
    useEffect(() => {
        detectarUsuario();
    }, []);

    const detectarUsuario = () => {
        auth.onAuthStateChanged(user => {
            if (user) {

                user.getIdTokenResult()
                    .then(idTokenResult => {
                        console.log(idTokenResult);
                        if (!!idTokenResult.claims.admin) {
                            console.log('es admin');
                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: true,
                                rol: 'admin'
                            });
                        } else if (!!idTokenResult.claims.autor) {
                            console.log('es autor');
                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: true,
                                rol: 'autor'
                            });
                        } else {
                            console.log('es invitado');
                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: true,
                                rol: 'invitado'
                            });
                        }
                    });
                //console.log(user);
            } else {
                console.log(user);
                setUsuario({
                    email: null,
                    uid: null,
                    activo: false,
                    rol: null
                });
            }
        });
    };


    const [usuario, setUsuario] = useState(dataUsuarioInicial);

    const iniciarSesion = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider);

            const existe = await db.collection('usuariosCustom').doc(res.user.email).get();

            if (!existe.exists) {
                await db.collection('usuariosCustom').doc(res.user.email).set({
                    uid: res.user.uid,
                    email: res.user.email,
                    rol: 'Invitado'
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const cerrarSesion = () => {
        auth.signOut();
    };

    return (
        <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {props.children}
        </UsuarioContext.Provider>
    );
};

export default UsuarioProvider;
