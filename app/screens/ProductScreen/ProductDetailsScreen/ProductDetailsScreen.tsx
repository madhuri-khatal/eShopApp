import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { HeaderBar } from "../../../components/ui/HeaderBar"
import { DrawerActions, NavigationAction, NavigationContainerProps, NavigationContainerRef, NavigationProp, NavigationState } from "@react-navigation/native"

export const ProductDetailsScreen=(props:any)=>{
   const {navigation}=props
    return <ScrollView>
        <HeaderBar title="product detail screen" backAction={()=>navigation.goBack()} icon1="menu" right1Action={()=>navigation.dispatch(DrawerActions.toggleDrawer())}/>
        <Text>  Product Detail screen</Text>
    </ScrollView>
}