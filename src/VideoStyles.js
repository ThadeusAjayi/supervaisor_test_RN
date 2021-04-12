import { StyleSheet, Platform } from 'react-native';

export default VideoStyles = StyleSheet.create({
    backBtn : {
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#00000040",
        borderRadius: 40,
        alignItems: "center",
        zIndex: 3,
        width: 40, height: 40,
        position: "absolute",
        left: 10,
        top: 4
    },



    //Control Styles
    controlsContainer: {
        width: "100%",
        height: "100%",
        justifyContent:'center',
        zIndex: 1,
        position: 'absolute'
    },
    controlsPlayBtn: {
        padding: 16
    },
    controlsVideoTime: {
        color: 'white',
        paddingHorizontal: 14,
        fontFamily: "Muli-Bold"
    },

    //Tv controls
    live: {
        backgroundColor: "#FD2E47",
        color: "white",
        fontSize: 10,
        textAlign: "center",
        borderRadius: 2,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontFamily: "Muli"
    },
    tvControls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        zIndex: 10,
        flex: 1
    }
})