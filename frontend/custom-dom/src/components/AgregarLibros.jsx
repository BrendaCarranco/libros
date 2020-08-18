import React, { useState, useContext } from 'react';
import { db } from '../firebase';

import { UsuarioContext } from '../context/UsuarioProvider';
import { LibrosContext } from '../context/LibrosProvider';

const AgregarLibros = () => {

    const [titulo, setTitulo] = useState('');
    const [paginas, setPaginas] = useState('');


    const { usuario } = useContext(UsuarioContext); //con este obtenemos la info del usuario
    const { fetchLibros } = useContext(LibrosContext);

    const agregarLibro = e => {
        e.preventDefault();
        if (!titulo.trim() || !paginas.trim()) {
            console.log('campos vacios :(');
            return;
        }

        db.collection('librosCustom').add({
            titulo: titulo,
            paginas: paginas,
            uid: usuario.uid,
            autor: db.collection('usuariosCustom').doc(usuario.email)
        })
            .then(doc => {
                console.log(doc);
                fetchLibros();
            })
            .catch(error => console.log(error));

        setTitulo('');
        setPaginas('');
    };


    return (
        <div className='mt-5'>
            <h3>Agregar libros</h3>
            <form onSubmit={agregarLibro} >
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder='Ingresa título'
                    onChange={e => setTitulo(e.target.value)}
                    value={titulo}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder='Ingresa páginas'
                    onChange={e => setPaginas(e.target.value)}
                    value={paginas}
                />
                <button
                    type='submit'
                    className='btn btn-primary'
                >
                    Agregar
                </button>
            </form>
        </div >
    );
};

export default AgregarLibros;
