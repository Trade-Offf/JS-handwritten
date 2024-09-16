/*
    题目：括号全匹配
    描述：输入一个字符串，判断里面的括号都是否匹配，如果元素都匹配返回true，如果元素都不匹配，则返回false

    示例：
    输入： str = '{a(b[c]d)e}f'
    输出： true

    输入 str = {a(b[c]d}e)f
    输出： false
*/

/*
思路：使用栈来解决，遍历字符串，如果是左括号，直接入栈；如果是右括号，取出栈顶元素，判断是否匹配，
    * 如果匹配，出栈，如果不匹配，返回false，
    * 最后判断栈是否为空，如果为空，说明全部匹配，返回true
*/



function isMatch(left, right) {
    if (left === '{' && right === '}') return true
    if (left === '[' && right === ']') return true
    if (left === '(' && right === ')') return true
    return false
}

export function matchBracket(str) {
    let length = str.length
    let stack = []
    let leftSymbols = '{[('
    let rightSymbols = '}])'

    for (let i = 0; i < length; i++) {
        const n = str[i]
        if (leftSymbols.includes(n)) {
            stack.push(n) // 如果是左括号，直接入栈
        } else if (rightSymbols.includes(n)) {  // 如果是右括号
            const top = stack[stack.length - 1] // 取出栈顶元素
            // 判断栈顶元素，和当前右括号是否匹配
            if (isMatch(top, n)) {
                stack.pop() // 如果匹配，出栈
            } else {
                return false
            }

        }
    }

    return stack.length === 0;   // 如果最后栈为空，说明全部匹配，返回true
}

// test
console.log(matchBracket('{a(b[c]d)e}f')) // true