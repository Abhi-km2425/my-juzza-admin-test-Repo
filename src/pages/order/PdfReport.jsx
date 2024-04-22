import React from 'react';
import { Document, Page, Text, View, Rect, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from "../../utils/DateFormat";


// Create styles

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        color: '#000000'
    },
    section: {
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecoration: 'underline',

    },
    subheading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textDecoration: 'underline',
    },
    paragraph: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#000000'
    },
    box: {
        width: '550px',
        height: 'auto',
        border: '2px solid black',
        padding: 10,
        margin: 5,
    },

    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        padding: 4,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 1.5,
        color: '#000000',
    },
});


const PdfReport = ({ data }) => {

    console.log(data)
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.section}>
                    <Text style={styles.heading}>Order Report</Text>

                    {data
                        ?

                        <Rect style={styles.box}>
                            <Text style={styles.paragraph}>Name : {data?.userDetails?.name}</Text>
                            <Text style={styles.paragraph}>Email : {data?.userDetails?.email}</Text>
                            <Text style={styles.paragraph}>Phone : {data?.userDetails?.number}</Text>
                            <Text style={styles.paragraph}>Ordered Date : {formatDate(data.order[0].createdAt)}</Text>
                            <Text style={styles.paragraph}>Shipping Address : {data?.address?.houseName},
                                {data?.address?.street}, {data?.address?.city}, {data?.address?.state},
                                {data?.address?.postalCode}, {data?.address?.phone},</Text>


                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>Product Name</Text>
                                    <Text style={styles.tableCell}>Weight</Text>
                                    <Text style={styles.tableCell}>Price</Text>
                                    <Text style={styles.tableCell}>Quantity</Text>
                                    <Text style={styles.tableCell}>Total</Text>
                                </View>

                                {
                                    data?.orderProducts?.map((row, i) => (
                                        <View key={i} style={styles.tableRow}>
                                            <Text style={styles.tableCell}>{row?.p_name}</Text>
                                            <Text style={styles.tableCell}>{row?.weight}</Text>
                                            <Text style={styles.tableCell}>Rs.{row?.finalPrice}</Text>
                                            <Text style={styles.tableCell}>{row?.cartProduct?.quantity}</Text>
                                            <Text style={styles.tableCell}>Rs.{row.finalPrice * row?.cartProduct?.quantity}</Text>
                                        </View>
                                    ))
                                }

                            </View>



                        </Rect>



                        :
                        <Text style={styles.paragraph}>No Data Available</Text>

                    }

                </View>

                {/* <View style={styles.section}>
                    <Text style={styles.heading}>Order Report</Text>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Column 1</Text>
                            <Text style={styles.tableCell}>Column 2</Text>
                            <Text style={styles.tableCell}>Column 3</Text>
                            <Text style={styles.tableCell}>Column 4</Text>
                            <Text style={styles.tableCell}>Column 5</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Data 1</Text>
                            <Text style={styles.tableCell}>Data 2</Text>
                            <Text style={styles.tableCell}>Data 3</Text>
                            <Text style={styles.tableCell}>Data 4</Text>
                            <Text style={styles.tableCell}>Data 5</Text>
                        </View>
                    </View>

                </View> */}
            </Page>
        </Document>
    )
}

export default PdfReport