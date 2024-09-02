
/*
    题目：234.回文链表（easy）
    描述：给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
    回文：序列是向前和向后读都相同的序列
    
    示例：
    输入：head = [1,2,2,1]
    输出：true
*/

// 基础解法，将链表的值存入数组，然后判断数组是否为回文数组
// 时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。
// 空间复杂度：O(n)，其中 n 是链表的长度。需要使用一个数组存储链表的元素值。
var isPalindrome = function (head) {
    let arr = [];
    while (head) {
        arr.push(head.val); // 将链表的值存入数组
        head = head.next;
    }
    return arr.join('') === arr.reverse().join(''); // 判断反转后的数组是否与原数组相等
}


// 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
// 进阶解法，通过快慢指针找到链表的中点，然后反转后半部分链表，再比较前后两部分链表是否相等
const reverseList = (head) => {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let nextTemp = curr.next; // 暂存下一个节点
        curr.next = prev;         // 当前节点指向前一个节点
        prev = curr;              // 前一个节点移动到当前节点
        curr = nextTemp;          // 当前节点移动到下一个节点
    }
    return prev; // 返回反转后的链表头节点
}

// 当快指针到达链表末尾时，慢指针指向链表中点
const endOfFirstHalf = (head) => {
    let fast = head; // 快指针
    let slow = head; // 慢指针
    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next; // 快指针每次移动两步
        slow = slow.next;      // 慢指针每次移动一步
    }
    return slow; // 返回前半部分链表的尾节点
}

var isPalindrome = function (head) {
    if (head == null) return true; // 如果链表为空，直接返回 true

    const firstHalfEnd = endOfFirstHalf(head);              // 找到前半部分链表的尾节点
    const secondHalfStart = reverseList(firstHalfEnd.next); // 反转后半部分链表

    // 判断是否回文
    let p1 = head;
    let p2 = secondHalfStart;
    let result = true;
    while (result && p2 != null) {
        if (p1.val != p2.val) result = false; // 如果值不相等，设置 result 为 false
        p1 = p1.next; // 移动到下一个节点
        p2 = p2.next; // 移动到下一个节点
    }

    // 还原链表并返回结果
    firstHalfEnd.next = reverseList(secondHalfStart); // 还原反转的后半部分链表
    return result; // 返回是否为回文链表的结果
};


// 测试
let head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 2,
            next: {
                val: 1,
                next: null
            }
        }
    }
}; // 回文链表：1 -> 2 -> 2 -> 1
console.log(isPalindrome(head)); // true