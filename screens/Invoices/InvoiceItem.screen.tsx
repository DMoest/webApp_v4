import React from 'react';
import {Text, View} from 'react-native';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import {StatusBar} from 'expo-status-bar';
import * as Style from '../../assets/styles';


/**
 * InvoiceItem screen/view.
 *
 * @constructor
 * @param props
 */
export const InvoiceItem: (
    props: InvoiceInterfaces.InvoiceItemProps,
) => React.JSX.Element = (props: InvoiceInterfaces.InvoiceItemProps) => {
    const invoice = props.route.params.item;

    return (
        <View style={[Style.Base.content]}>
            <Text style={Style.Typography.subHeader}>{invoice.id}</Text>

            <View style={Style.Container.flexBox.row}>
                <Text style={Style.Typography.dataLeft}>Faktura id: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice.order_id}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={Style.Typography.dataLeft}>Fakturanummer: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice.total_price}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={Style.Typography.dataLeft}>Kund: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice.creation_date}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={Style.Typography.dataLeft}>Datum: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice.due_date}
                </Text>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
};
