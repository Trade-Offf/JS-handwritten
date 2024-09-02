
/*
    题目：141.环形链表（easy）
    描述：给你一个链表的头节点 head ，判断链表中是否有环。
    如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。

    为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
    注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。如果链表中存在环 ，则返回 true 。 否则，返回 false 。
    
    示例：
    输入：head = [3,2,0,-4], pos = 1
    输出：true
    解释：链表中有一个环，其尾部连接到第二个节点。
*/

// 本质是龟兔赛跑问题，快慢指针。如果链表中存在环，快慢指针一定会相遇
// 时间复杂度：O(n)，其中 n 是链表中的节点数。最坏情况下，时间复杂度为 O(n)。
var hasCycle = function (head) {
    let slow = head; // 慢指针
    let fast = head; // 快指针

    while (fast && fast.next) { // 当快指针和快指针的下一个节点都不为空时，继续循环
        slow = slow.next; // 慢指针每次移动一步
        fast = fast.next.next; // 快指针每次移动两步
        if (slow === fast) {
            return true; // 如果快慢指针相遇，说明链表中存在环
        }
    }
    return false; // 如果循环结束，快指针到达链表末尾，说明链表中不存在环，返回 false
};


// 测试
let head = {
    val: 3,
    next: {
        val: 2,
        next: {
            val: 0,
            next: {
                val: -4,
                next: null
            }
        }
    }
};
head.next.next.next.next = head.next; // 使链表中存在环
console.log(hasCycle(head)); // true