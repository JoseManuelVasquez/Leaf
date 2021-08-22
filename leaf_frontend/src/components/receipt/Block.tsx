import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme: any) => ({
    root: {
        minWidth: 300,
    },
    text: {
        whiteSpace: 'pre-wrap'
    }
});

export interface BlockProps {
    lines: string[]
}

export interface BlockState {
}

class Block extends React.Component<BlockProps, BlockState> {
    constructor(props: BlockProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {classes}: any = this.props;
        let key = 0;
        return (
            <Card className={classes.root}>
                <CardContent>
                    {
                        this.props.lines.map(line => {
                            key += 1;
                            return <Typography
                                className={classes.text}
                                key={key}
                                variant="body2"
                                component="p">{line}</Typography>
                        })
                    }
                </CardContent>
            </Card>
        );
    }
}

// @ts-ignore
export default withStyles(useStyles)(Block)