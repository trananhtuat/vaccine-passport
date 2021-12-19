import { useState } from 'react'
import userApi from '../api/userApi'
import QrReader from 'react-qr-reader'
import { PageHeader } from '../components'
import { Grid, Card, CardContent, CardActions, Button, Stack, CardHeader, Typography, FormControl, TextField } from '@mui/material'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'

const QRScan = () => {
    const [onLoadUser, setOnLoadUser] = useState(false)
    const [user, setUser] = useState()

    const handleErr = (er) => {
        console.log(err)
    }

    const handleScan = async (data) => {
        if (onLoadUser) return
        if (!data) return
        try {
            setOnLoadUser(true)
            const res = await userApi.getOne(data)
            setUser(res)
        } catch(err) {
            console.log(err)
        } finally {
            setOnLoadUser(false)
        }
    }

    return (
        <>
            <PageHeader title='Scan user QR'/>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Card elevation={0}>
                        <CardContent>
                            <QrReader
                                delay={1000}
                                onError={handleErr}
                                onScan={handleScan}
                                style={{width: '100%'}}
                                facingMode='user'
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant='contained'
                                disableElevation
                                onClick={() => setUser(null)}
                            >
                                Reset
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <Stack spacing={4}>
                        <Card elevation={0}>
                            <CardHeader title={<Typography variant='h6'>
                                User info
                            </Typography>}/>
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            {
                                                user && <TextField
                                                    label='Id card'
                                                    variant='outlined'
                                                    value={user.idNumber}
                                                    InputProps={{ readOnly: true }}
                                                />
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            {
                                                user && <TextField
                                                    label='Fullname'
                                                    variant='outlined'
                                                    value={user.fullName}
                                                    InputProps={{ readOnly: true }}
                                                />
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            {
                                                user && <TextField
                                                    label='Phone'
                                                    variant='outlined'
                                                    value={user.phoneNumber}
                                                    InputProps={{ readOnly: true }}
                                                />
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            {
                                                user && <TextField
                                                    label='Address'
                                                    variant='outlined'
                                                    value={user.address}
                                                    InputProps={{ readOnly: true }}
                                                />
                                            }
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card elevation={0}>
                            <CardHeader title={<Typography variant='h6'>
                                Vaccinated information
                            </Typography>}/>
                            <CardContent>
                                {
                                    user && <UserVaccinated vaccinatedList={user.vaccinated}/>
                                }
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default QRScan

const UserVaccinated = ({vaccinatedList}) => {
    const tableHeader = [
        {
            field: 'vaccine', headerName: 'Vaccine', width: 220,
            renderCell: (params) => params.value.name
        },
        {
            field: 'vaccineLot', headerName: 'Vaccine lot', width: 170,
            renderCell: (params) => params.value.name
        },
        {
            field: 'createdAt', headerName: 'time', flex: 1,
            renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
        }
    ]
    return (
        <DataGrid
            autoHeight
            rows={vaccinatedList}
            columns={tableHeader}
            pageSize={6}
            rowsPerPageOptions={[6]}
            density='comfortable'
            showCellRightBorder
            showColumnRightBorder
        />
    )
}