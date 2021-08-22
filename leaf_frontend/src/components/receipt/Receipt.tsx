import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {ALLOWED_FILE_TYPES} from "../../utils/constant";
import ReceiptPresenter, {IReceiptPresenter} from "./ReceiptPresenter";
import Block from "./Block";

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
    updateSnackbar: Function;
}

export interface ReceiptState {
    isUploaded: boolean
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
            file: null,
            linesBlock: [['']]
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
        this.setState({file: file, isUploaded: true});
    }

    handleSubmit(event: any): any {
        const file: any = this.state.file;

        // Check if the file is allowed.
        if (file.type && !ALLOWED_FILE_TYPES.includes(file.type)) {
            console.log('File is not a text file.', file.type, file);
            return;
        }

        // Process the file in order to get the blocks
        this.presenter.processReceipt(file);

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
            console.log(reader.result);

            // @ts-ignore
            let lines = reader.result.split('\n');
            let blocks: string[][] = [];
            let linesBlock: string[] = [];
            data.forEach((block: any) => {
                for (let row=block.begin_row; row <= block.end_row; row++) {
                    for (let i=lines[row].length; i < block.end_col; i++)
                        lines[row] += ' ';
                    linesBlock.push(lines[row]);
                }
                // @ts-ignore
                blocks.push(linesBlock);
                linesBlock = [];
            });
            console.log(blocks);
            this.setState({linesBlock: blocks})
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
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {
                        this.state.linesBlock.map(lines => {
                            return <div><Block lines={lines} /><br/></div>
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
                        {this.state.isUploaded &&
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