import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface IProps {
    source: any,
    className?: any,
    width?: number,
    height?: number,
}

const RoundedImage = ({ source, className, width = 30, height = 30 }: IProps) => {
    return (
        <View style={[styles.container, { width, height }, className]}>
            <Image style={styles.image} source={source} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50, // Half of the width and height to make it circular
        overflow: 'hidden', // Clip the content to the rounded shape
    },
    image: {
        flex: 1, // Make the image take the full size of the container
        width: null, // Set width to null to fill the container width
        height: null, // Set height to null to fill the container height
        resizeMode: 'cover', // Maintain the aspect ratio of the image
    },
});

export default RoundedImage;
