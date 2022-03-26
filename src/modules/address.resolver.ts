export default {
    Query: {
        getAllProvinces(root: any, args: any, context: any){
            return [{
                id: 1,
                name: 'Ho Chi Minh'},
                {
                    id: 2,
                    name: "Can Tho"},
                {
                    id: 3, 
                    name: "Phan Thiet"
            }]
        },
        getDistricts(root: any, args: any, context: any){
            const id = args.id;
        }
    }
}