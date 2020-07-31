import React, { useState } from 'react';
import './clients.css';
import { useConnectedClients } from '../../services/hooks';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default function Clients() {
    const [mobileClientsVisible, setMobileClientsVisible] = useState(false);
    const clients = useConnectedClients();

    const menuClick = () => {
        setMobileClientsVisible(!mobileClientsVisible);
    }

    return (
        <>
            <nav>
                <div className="mobileMenu">
                    <IconButton onClick={() => menuClick()}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </nav>
            <div className={`connectedClientsContainer ${mobileClientsVisible ? 'mobileShow' : ''}`}>
                <h3>Utenti connessi</h3>
                <ul>
                    {
                        clients.map((client, i) => (
                            <li key={i}>
                                <div className="connectedClients__client">
                                    <div className="client__name" title={'#'+client.hash}>{ client.name }</div>
                                    <div className="client__hash">#{ client.hash }</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}
