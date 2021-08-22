import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import {ALLOWED_FILE_TYPES} from "../../utils/constant";
import ReceiptPresenter, {IReceiptPresenter} from "./ReceiptPresenter";
import Block from "./Block";

/**
 *  In line style
 */
const useStyles = (theme: any) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#059475',
    },
    box: {
        margin: theme.spacing(1),
    }
});

export interface ReceiptProps {
    updateSnackbar: Function;
}

export interface ReceiptState {
    isUploaded: boolean;
    isProcessed: boolean;
    file: any;
    linesBlock: string[][];
}

export interface IReceipt {
    onProcessSucess(data: string): void;
    onError(): void;
}

class Receipt extends React.Component<ReceiptProps, ReceiptState> implements IReceipt{

    presenter: IReceiptPresenter;

    constructor(props: ReceiptProps) {
        super(props);
        this.state = {
            isUploaded: false,
            isProcessed: false,
            file: null,
            linesBlock: []
        };

        this.presenter = new ReceiptPresenter(this);

        this.onChangeInputFile = this.onChangeInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * --- START View methods ---
     */
    onChangeInputFile(event: any): any {
        const file: any = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            // @ts-ignore
            let lines = [reader.result.split('\n')];
            this.setState({isUploaded: true, linesBlock: lines, file: file});
        });
        reader.readAsText(file);
    }

    handleSubmit(event: any): any {
        const file: any = this.state.file;

        // Check if the file is allowed.
        if (file.type && !ALLOWED_FILE_TYPES.includes(file.type)) {
            console.error('File is not a text file.', file.type, file);
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            // Process the file in order to get the blocks
            this.presenter.processReceipt(reader);
        });
        reader.readAsText(file);

        this.setState({linesBlock: []});

        event.preventDefault();
    }
    /**
     * --- END View methods ---
     */

    /**
     * --- START Called by Presenter ---
     */
    onProcessSucess(data: any): void {
        const file: any = this.state.file;
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            // @ts-ignore
            let lines = reader.result.split('\n');
            let blocks: string[][] = [];
            let linesBlock: string[] = [];
            data.forEach((block: any) => {
                for (let row=block.begin_row; row <= block.end_row; row++) {
                    linesBlock.push(lines[row]);
                }
                // @ts-ignore
                blocks.push(linesBlock);
                linesBlock = [];
            });
            this.setState({linesBlock: blocks, isProcessed: true})
        });
        reader.readAsText(file);
        this.props.updateSnackbar("Receipt Successfully processed!", false);
    }

    onError(): void {
        this.props.updateSnackbar("Something happened!", true);
    }
    /**
     * --- END Called by Presenter ---
     */

    render() {
        const {classes}: any = this.props;
        let key = 0;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {
                        this.state.linesBlock.map(lines => {
                            key += 1;
                            return <div className={classes.box} key={key}>
                                        <Grow in={true} timeout={1500}>
                                            <div><Block lines={lines} /></div>
                                        </Grow>
                                    </div>
                        })
                    }
                    <form onSubmit={this.handleSubmit}>
                        {!this.state.isUploaded &&
                        <Button
                            fullWidth
                            color="primary"
                            className={classes.submit}
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                id="inputfile"
                                type="file"
                                hidden
                                accept=".txt"
                                onChange={this.onChangeInputFile}
                            />
                        </Button>}
                        {this.state.isUploaded && !this.state.isProcessed &&
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Analyze receipt
                        </Button>}
                    </form>
                </div>
            </Container>
        );
    }
}

// @ts-ignore
export default withStyles(useStyles)(Receipt)