/*
    题目：206.反转链表（easy）
    描述：给定单链表的头节点 head，反转该链表并返回反转后的链表。
    链表：每个节点包含一个值和一个指向下一个节点的引用（指针），通过这种方式可以遍历整个链表。
    
    示例：
    输入：head = [1, 2, 3, 4, 5]
    输出：[5, 4, 3, 2, 1]
*/

/**
 * @param {ListNode} head 链表的头节点
 * @return {ListNode}
 */
//  时间复杂度：O(n),其中 n 是链表的长度。需要遍历链表一次。
//  空间复杂度：O(1)，原地反转链表，只使用了常数的额外空间。
var reverseList = function (head) {
    // 初始化变量
    let prev = null;	// 初始化前一个节点
    let curr = head;	// 存储当前节点

    while (curr) {
        const next = curr.next;
        curr.next = prev;	// 反转指针
        prev = curr;        // 更新前一个节点
        curr = next;        // 更新当前节点
    }
    // 链表整体可以通过头节点来表示。
    // 头节点是链表的起点，通过它可以访问链表中的所有节点。
    return prev;
};


// 测试用例
const head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }
    }
};  // 单链表：1 -> 2 -> 3 -> 4 -> 5

// 输出：{ val: 5, next: { val: 4, next: { val: 3, next: { val: 2, next: { val: 1, next: null } } } } }
console.log(reverseList(head));
