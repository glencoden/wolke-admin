import { useState } from 'react';
import './App.css';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { requestService } from './lib/requestService/requestService';
import OAuth from './features/OAuth/OAuth';
import Cards from './features/Cards/Cards';
import Login from './components/Login/Login';

const Features = {
    NONE: 'none',
    OAUTH2: 'oauth2',
    CARDS: 'cards'
};

const featureNames = Object.values(Features);

const featureComponents = {
    [Features.NONE]: null,
    [Features.OAUTH2]: OAuth,
    [Features.CARDS]: Cards
};


function App() {
    const [ menuRef, setMenuRef ] = useState(null);
    const [ adminPassword, setAdminPassword ] = useState('');
    const [ currentFeature, setCurrentFeature ] = useState(featureNames[0]);

    const FeatureComponent = featureComponents[currentFeature];

    const handleMenuClick = event => {
        setMenuRef(event.currentTarget);
    };

    const handleMenuClose = ({ target }) => {
        const updatedFeature = target.innerText;
        if (featureNames.includes(updatedFeature)) {
            setCurrentFeature(updatedFeature);
        }
        setMenuRef(null);
    };

    const onLogin = adminPassword => {
        setAdminPassword(adminPassword);
    }

    const onLogout = resp => {
        if (!resp.success) {
            return;
        }
        setAdminPassword('');
    };

    if (!adminPassword) {
        return (
            <div className="App">
                <Login
                    onSuccess={onLogin}
                />
            </div>
        );
    }

    return (
        <div className="App">
            <div className="top-line">
                <Button
                    variant="contained"
                    color="primary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                >
                    {currentFeature}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={menuRef}
                    keepMounted
                    open={Boolean(menuRef)}
                    onClose={handleMenuClose}
                >
                    {featureNames.map((featureName, index) => (
                        <MenuItem key={index} onClick={handleMenuClose}>
                            {featureName}
                        </MenuItem>
                    ))}
                </Menu>
                <Button
                    variant="contained"
                    onClick={() => requestService.logout().then(onLogout)}
                >
                    Logout
                </Button>
            </div>

            {FeatureComponent && (
                <FeatureComponent adminPassword={adminPassword} />
            )}
        </div>
    );
}

export default App;
