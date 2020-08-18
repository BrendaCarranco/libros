import React, { useContext } from 'react';

import { LibrosContext } from '../context/LibrosProvider';
import PintarAutor from './PintarAutor';

const Libros = () => {

    const { libros } = useContext(LibrosContext);

    return (
        <div className='mt-5'>
            <h3>Lista de libros</h3>
            <ul className="list-group">
                {
                    libros.map(libro => (
                        <li className="list-group item" key={libro.id}>
                            <span>
                                {libro.titulo}
                            </span>
                            <span>
                                <PintarAutor id={libro.id} referencia={libro.autor} />
                            </span>

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Libros;
