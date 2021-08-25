import { useRef, useState } from 'react';
import './App.css';
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, TextField } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import OAuth from './features/OAuth/OAuth';
import Cards from './features/Cards/Cards';

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
    const anchorRef = useRef(null);
    const [ adminPassword, setAdminPassword ] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const currentFeature = Object.values(Features)[selectedIndex];
    const FeatureComponent = featureComponents[currentFeature];

    const handleClick = () => {
        console.info(`You clicked ${featureNames[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="App center-column">
            <div className="top-line">
                <TextField
                    label="admin password"
                    type="password"
                    value={adminPassword}
                    onChange={({ target }) => setAdminPassword(target.value)}
                />
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{featureNames[selectedIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu">
                                        {featureNames.map((name, index) => (
                                            <MenuItem
                                                key={name}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>

            {FeatureComponent && (
                <FeatureComponent adminPassword={adminPassword} />
            )}
        </div>
    );
}

export default App;
