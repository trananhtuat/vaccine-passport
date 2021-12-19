import PropTypes from 'prop-types'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const CustomDialog = props => {
    return (
        <Dialog
            open={props.open}
            PaperProps={{
                style: { padding: '15px' }
            }}
        >
            <DialogTitle>
                {props.title}
                {
                    props.showIcon && <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {
                            props.type === 'success' && <CheckCircleOutlinedIcon
                                color='success'
                                sx={{fontSize: '3.5rem'}}
                            />
                        }
                        {
                            props.type === 'error' && <ErrorOutlineOutlinedIcon
                                color='error'
                                sx={{fontSize: '3.5rem'}}
                            />
                        }
                    </Box>
                }
            </DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                {props.actions}
            </DialogActions>
        </Dialog>
    )
}

CustomDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.node,
    actions: PropTypes.node,
    showIcon: PropTypes.bool,
    type: PropTypes.string,
    open: PropTypes.bool
}

export default CustomDialog
