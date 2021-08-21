import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

/**
 *  In line style
 */
const useStyles = (theme: any) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#059475',
    },
});

export interface ReceiptProps {
}

export interface ReceiptState {
}

export interface IReceipt {
}

class Receipt extends React.Component<ReceiptProps, ReceiptState> implements IReceipt{

    //presenter: IReceiptPresenter;

    constructor(props: ReceiptProps) {
        super(props);
        this.state = {
        };
    }

    /**
     * --- START View methods ---
     */
    /**
     * --- END View methods ---
     */

    /**
     * --- START Called by Presenter ---
     */

    /**
     * --- END Called by Presenter ---
     */

    render() {
        const {classes}: any = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Button
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            id="input"
                            type="file"
                            hidden
                        />
                    </Button>
                </div>
            </Container>
        );
    }
}

// @ts-ignore
export default withStyles(useStyles)(Receipt)