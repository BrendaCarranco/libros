import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';

export const LibrosContext = createContext();

const LibrosProvider = (props) => {

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = async () => {
        try {
            const res = await db.collection('librosCustom').get();
            const arrayLibros = res.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                };
            });
            setLibros(arrayLibros);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LibrosContext.Provider value={{ libros, fetchLibros }} >
            {props.children}
        </LibrosContext.Provider>
    );
};

export default LibrosProvider;
