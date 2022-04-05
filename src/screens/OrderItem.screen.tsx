import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import {theme} from "../assets/themes/theme";


/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const OrderItem: React.FC = ({route}) => {
    const item = route.params.item
    console.log("ORDER: ", item)

    const orderDetails = () => {
        return (
            <View style={styles.bottomSeparator}>
                <View style={styles.flexRow}>
                    <Text style={styles.text}>Order ID: </Text>
                    <Text style={styles.dataRight}>{item.id}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Status: </Text>
                    <Text style={styles.dataRight}>{item.status}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Status kod: </Text>
                    <Text style={styles.dataRight}>{item.status_id}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Beställare: </Text>
                    <Text style={styles.dataRight}>{item.name}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Address: </Text>
                    <Text style={styles.dataRight}>{item.address}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Postkod: </Text>
                    <Text style={styles.dataRight}>{item.zip}</Text>
                </View>

                <View style={styles.flexRow}>
                    <Text style={styles.text}>Stad: </Text>
                    <Text style={styles.dataRight}>{item.city}</Text>
                </View>
            </View>
        )
    }

    function checkStockStatus({orderItem}) {
        let indicatorText;
        let indicatorColor;

        if (orderItem.amount <= orderItem.stock) {
            indicatorColor = theme.Colors.positiveColor
            indicatorText = "Det finns på lager, bara att plocka! "
        } else if (orderItem.amount > orderItem.stock) {
            indicatorColor = theme.Colors.warningColor
            indicatorText = "Kontrollera lagerplatsen, enligt lagersaldo finns inte tillräckligt av produkten. "
        }

        return (
            <Text style={styles.dataLeft, {color: indicatorColor}}>{indicatorText}</Text>
        );
    };

    const orderItems = item.order_items.map((orderItem, index) =>
        <View style={[styles.bottomSeparator]}>
            <View style={[styles.flexRow]}>
                <View style={[styles.flexCol, {flex: 1}]}>
                    <Text style={styles.dataLeft}>{index+1}. </Text>
                    <Text style={styles.dataLeft}> </Text>
                    <Text style={styles.dataLeft}> </Text>
                </View>

                <View style={[styles.flexCol, {flex: 2}]}>
                    <Text style={styles.dataLeft}>{orderItem.amount} st {orderItem.name}</Text>
                    <Text style={styles.dataLeft}>{orderItem.product_id}</Text>
                    <Text style={styles.dataLeft}>{orderItem.article_number}</Text>
                </View>

                <View style={[styles.flexCol, {flex: 2}]}>
                    <Text style={styles.dataRight}> </Text>
                    <Text style={styles.dataRight}>{orderItem.stock} st i lager</Text>
                    <Text style={styles.dataRight}>Plats: {orderItem.location}</Text>
                </View>

                {/*<View style={styles.flexCol}>*/}
                {/*    <Text style={styles.dataLeft}> </Text>*/}
                {/*</View>*/}
            </View>

            <View style={[styles.smallContainer, styles.flexRow, {
                paddingVertical: theme.Typography.whiteSpace }]}>

                <View style={[styles.flexCol, {flex: 1}]}>
                    <Text style={styles.dataLeft}> </Text>
                </View>

                <View style={{flex: 4.5}}>
                    {checkStockStatus({orderItem})}
                </View>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, {paddingBottom: 0}]}>
            <ScrollView style={styles.biggerContainer}>
                {orderDetails()}
                {orderItems}

                {/*<Button title='Packa order' onPress={} />*/}
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

/**
 * StockListItem styles.
 */
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        paddingHorizontal: theme.Typography.whiteSpace50,
        paddingVertical: theme.Typography.whiteSpace,
        backgroundColor: theme.Colors.white,
    },
    smallContainer: {
        flex: 1,
        paddingHorizontal: theme.Typography.whiteSpace50,
        // paddingVertical: theme.Typography.whiteSpace,
        backgroundColor: theme.Colors.white,
    },
    biggerContainer: {
        flex: 2,
        paddingHorizontal: theme.Typography.whiteSpace50,
        paddingVertical: theme.Typography.whiteSpace,
        backgroundColor: theme.Colors.white,
        bottom: 0,
    },
    imgContainer: {
        width: theme.Images.coverWidth,
        height: theme.Images.coverHeight,
    },
    image: {
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
        width: '100%',
        height: undefined,
    },
    header: {
        marginTop: theme.Container.headerMarginT,
        marginBottom: theme.Container.headerMarginB,
        color: theme.Colors.textColorDark,
        fontSize: theme.Typography.h1Size,
        fontFamily: theme.Typography.headerFont,
        alignSelf: 'center'
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.Container.subHeaderMarginT,
        marginBottom: theme.Container.subHeaderMarginB,
        fontSize: theme.Typography.h4Size,
        color: theme.Colors.textColorDark,
    },
    text: {
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    dataLeft: {
        textAlign: 'left',
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    dataCenter: {
        textAlign: 'center',
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    dataRight: {
        textAlign: 'right',
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    button: {
        fontSize: theme.Typography.btnSmallFontSize,
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
    flexRow: {
        // flex: 4,
        width: '95%',
        // height: undefined,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    flexCol: {
        top: 0,
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
    },
    flexDataCol: {
        width: '20%',
        height: undefined,
        alignSelf: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    bottomSeparator: {
        paddingVertical: theme.Typography.whiteSpace25,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    }
});
