export class storeUtility {
    // [{id, ...}, {id, ...}] => normal array
    // Entities: [id: {}] => normalized format

    // normalize function convert the normal array to object i.e. (normalized format) 
    static normalize(entityArray: Entity[]){
        return entityArray.reduce((prevVal, currentVal) => {
            return {...prevVal, ...{[currentVal.id]: currentVal}}
        }, {})
    }

    // {id: {id:'text', val:'text'}} => entities format
    // Unnormalize function convert the entity format i.e. object to array

    static unNormalize(entities : {[id: number]: any}){
        if(entities){
            return Object.keys(entities).map(key => entities[key])
        }
        return []
    }

    // Filter duplicate id [1,2,3,4,6,1]
    static filterDuplicateId(ids: number[]){
        return ids.filter((elem, index, self) => index = self.indexOf(elem))
    }

    // Remove keys on delete
    static removeKey(entities: {[id:number]:any}, id:any){
        const newObj = {...entities};
        delete newObj[id]
        return newObj
    }
}

export interface Entity{
    id: any
}