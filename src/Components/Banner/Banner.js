import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyle = makeStyles({
    banner: {
        backgroundImage: 'url(./banner.jpg)',
    },
    bannercontent: {
        height: 400,
        // display: 'flex',
        flexDirection: "columnn",
        paddingTop: 25,
        justifyContent: 'space-around'
    },
    tagline: {
        // display: "flex",
        height: "40%",
        // flexDirection: "columnn",
        justifyContent: 'center',
        textAlign: "center"
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
});
function Banner() {
    const classes = useStyle();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannercontent}>
                <div className={classes.tagline}>
                    <Typography variant='h2' style={
                        {
                            fontWeight: 'Bold',
                            marginBottom: 25,
                            marginTop: 40,
                        }}>Crypto Mania
                    </Typography>
                    <Typography variant='subtitle2' style={
                        {
                            color: "darkgray",
                            textTransform: "capitalize"
                        }}>
                        Trade with confidence on the world's fastest
                        crypto exchange
                    </Typography>


                </div>
                {/* <Banner /> */}
                <Carousel />
            </Container>

        </div>
    )
}

export default Banner