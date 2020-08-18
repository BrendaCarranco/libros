import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { LibrosContext } from '../context/LibrosProvider';

const PintarAutor = (props) => {

    const [autor, setAutor] = useState('');

    const { fetchLibros } = useContext(LibrosContext);

    useEffect(() => {
        fetchAutor();
    }, []);

    const fetchAutor = async () => {
        try {
            const res = await props.referencia.get();
            console.log(res.data());
            setAutor(res.data().email);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarLibro = async () => {
        try {
            await db.collection('librosCustom').doc(props.id).delete();
            fetchLibros();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <span>
                {autor}
            </span>
            <button
                className='btn btn-danger float-right '
                onClick={eliminarLibro}
            >Eliminar</button>
        </>
    );
};

export default PintarAutor;
