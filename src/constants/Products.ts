import { Product } from "../dto"


export const PRODUCTS:Product[]=[
    {
        id:'1',
        name:'Transparent Paccoleter',
        price:65000,
        category: "Pacoleter",
        image:require('../assests/transparent-pacoleter.jpg'),
        description:"Transparent Paccoleter"

    },
    {
        id:'2',
        name:'Scarelt Paccoleter',
        price:40000,
        category: "Pacoleter",
        image:require('../assests/scarelt_pacoleter.jpg'),
        description:"Scarelt Paccoleter"

    },
    {
        id:'3',
        name:'Jug Mella with Glass',
        price:35000,
        category: "Jug",
        image:require('../assests/jug-mella-2.jpg'),
        description:"Jug Mella with Glass"

    },
    {
        id:'4',
        name:'Jug hiaugo',
        price:40000,
        category: "Jug",
        image:require('../assests/jugs.jpg'),
        description:"Jug hiaugo"

    },

]