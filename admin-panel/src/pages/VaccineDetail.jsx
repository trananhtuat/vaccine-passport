import { useEffect, useState } from 'react'
import vaccineApi from '../api/vaccineApi'
import { PageHeader, CustomDialog, VaccineLots } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Grid, FormControl, TextField, CardActions, Typography, Box, Button } from '@mui/material'

const VaccineDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [vaccine, setVaccine] = useState()
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState('')
    const [dialogText, setDialogText] = useState('')
    const [onDelete, setOnDelete] = useState(false)

    useEffect(() => {
        const getVaccine = async () => {
            try {
                const res = await vaccineApi.getOne(id)
                setVaccine(res)
                setName(res.name)
            } catch(err) {
                console.log(err)
            }
        }
        getVaccine()
    }, [])

    const updateVaccine = async () => {
        if (onSubmit) return
        if (!name || name.trim().length === 0) {
            setNameErr(true)
            return
        }
        setNameErr(false)
        setOnSubmit(true)

        try {
            const res = await vaccineApi.update(id, {name})
            console.log(res)
            setDialogText('Vaccine updated')
            setDialogType('success')
        } catch(err) {
            console.log(err)
            setDialogText('Vaccine update fail')
            setDialogType('error')
        } finally {
            setOnSubmit(false)
            setDialogOpen(true)
        }
    }

    const deleteVaccine = async () => {
        if (onDelete) return
        setOnDelete(true)
        try {
            await vaccineApi.delete(id)
            setOnDelete(false)
            navigate('/vaccine')
        } catch(err) {
            console.log(err)
            setOnDelete(false)
            setDialogText('Delete fail')
            setDialogType('error')
            setDialogOpen(true)
        }
    }

    const resetPage = async () => {
        try {
            const res = await vaccineApi.getOne(id)
            setVaccine(res)
            setName(res.name)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <PageHeader
                title='Vaccine detail'
                rightContent={<LoadingButton
                    variant='text'
                    disableElevation
                    color='error'
                    loading={onDelete}
                    onClick={deleteVaccine}
                >
                    Delete
                </LoadingButton>}
            />
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Card elevation={0}>
                        <CardContent>
                            <FormControl fullWidth margin='normal'>
                                <TextField
                                    label='Vaccine name'
                                    variant='outlined'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={nameErr}
                                />
                            </FormControl>
                            {
                                vaccine && <>
                                    <FormControl fullWidth margin='normal'>
                                        <TextField
                                            label='Available'
                                            variant='outlined'
                                            value={vaccine.quantity - vaccine.vaccinated}
                                            InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth margin='normal'>
                                        <TextField
                                            label='Quantity'
                                            variant='outlined'
                                            value={vaccine.quantity}
                                            InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth margin='normal'>
                                        <TextField
                                            label='Vaccinated'
                                            variant='outlined'
                                            value={vaccine.vaccinated}
                                            InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                </>
                            }
                        </CardContent>
                        <CardActions>
                            <LoadingButton
                                variant='contained'
                                loading={onSubmit}
                                disableElevation
                                onClick={updateVaccine}
                            >
                                Update
                            </LoadingButton>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    {
                        vaccine && <VaccineLots
                            vaccine={vaccine}
                            onLotAdded={resetPage}
                            onLotDeleted={resetPage}
                            onLotUpdated={resetPage}
                        />
                    }
                </Grid>
            </Grid>
            <CustomDialog
                open={dialogOpen}
                type={dialogType}
                showIcon
                content={<Typography variant='subtitle1' textAlign='center'>
                    {dialogText}
                </Typography>}
                actions={<Box width='100%' sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant='contained' onClick={() => setDialogOpen(false)}>
                        OK
                    </Button>
                </Box>}
            />
        </>
    )
}

export default VaccineDetail
