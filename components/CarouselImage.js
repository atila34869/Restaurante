import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { size } from 'lodash'

export default function CarouselImage({images, width, height, activeSlide, setActiveSlide }) {


    const renderItem = ({item}) => {
        return (
            <View>
                <Image
                    style={{ width, height }}
                    PlaceholderContent={<ActivityIndicator color="#fff"/>} //circulo cargando
                    source={{ uri: item }}
                />
            </View>
            )
    }
    return (
        <View>
            <Carousel
                layout={"default"}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <MyPagination
                data={images}
                activeSlide={activeSlide}
            />
        </View>
    )
}

function MyPagination({data, activeSlide}){
    return (
        <Pagination
            dotsLength={size(data)}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerPagination}
            dotStyle={styles.dotActive}
            inactiveDotStyle={styles.dotInactive}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
        />
    )
}
const styles = StyleSheet.create({
    containerPagination:{
        backgroundColor: "transparent",
        zIndex: 1,
        position:"absolute",
        bottom:0,
        alignSelf:"center"
    },
    dotActive:{
        width:12,
        height:12,
        borderRadius:6,
        marginHorizontal:2,
        backgroundColor:"#b6ced6",
        opacity:0.4
    },
    dotInactive:{
        width:10,
        height:10,
        borderRadius:7,
        marginHorizontal:2,
        backgroundColor:"#fff"
    },
})
