import { useState } from 'react';
import './App.css';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { requestService } from './lib/requestService/requestService';
import Login from './components/Login/Login';
import OAuth from './features/OAuth/OAuth';
import Cards from './features/Cards/Cards';
import Alert from './components/Alert/Alert';

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

const resetAlertValue = () => ({ title: '', text: '', error: null });


function App() {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ menuRef, setMenuRef ] = useState(null);
    const [ currentFeature, setCurrentFeature ] = useState(featureNames[0]);
    const [ alert, setAlert ] = useState(resetAlertValue);

    const FeatureComponent = featureComponents[currentFeature];

    const handleMenuClick = event => {
        setMenuRef(event.currentTarget);
    };

    const handleMenuClose = event => {
        event.stopPropagation();
        const updatedFeature = event.target.innerText;
        if (featureNames.includes(updatedFeature)) {
            setCurrentFeature(updatedFeature);
        }
        setMenuRef(null);
    };

    const onLoginSuccess = adminPassword => {
        setIsAuthenticated(true);
    }

    const onLogoutSuccess = () => {
        setAlert({ title: `You're logged out` });
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <Login
                    onSuccess={onLoginSuccess}
                    setAlert={setAlert}
                />
            ) : (
                <>
                    <div className="top-line">
                        <Button
                            variant="contained"
                            color="primary"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onPointerDown={handleMenuClick}
                        >
                            {currentFeature}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={menuRef}
                            keepMounted
                            open={Boolean(menuRef)}
                        >
                            {featureNames.map((featureName, index) => (
                                <MenuItem key={index} onPointerDown={handleMenuClose}>
                                    {featureName}
                                </MenuItem>
                            ))}
                        </Menu>

                        <Button
                            variant="contained"
                            onClick={() => requestService.logout().then(onLogoutSuccess)}
                        >
                            Logout
                        </Button>
                    </div>

                    {FeatureComponent && (
                        <FeatureComponent setAlert={setAlert} />
                    )}
                </>
            )}

            <Alert alert={alert} reset={() => setAlert(resetAlertValue)} />
        </div>
    );
}

export default App;
