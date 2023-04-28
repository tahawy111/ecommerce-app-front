export default function getThis(param:any) {
    return param && typeof param !== 'undefined' ?  param : null
} 