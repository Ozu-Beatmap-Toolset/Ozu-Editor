var rootUuid = '';
var uuidHead = 0;

export const uuid = () => {
    const result = rootUuid + `${uuidHead}`;
    uuidHead++;
    if(uuidHead >= 100000) {
        uuidHead = 0;
        rootUuid += '100000'
    }
    return result;
}