/*
    题目：83.删除排序链表中的重复元素（easy）
    描述：给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回已排序的链表

    示例：
    输入：head = [1,1,2,3,3]
    输出：[1,2,3]
*/

var deleteDuplicates = function (head) {
    // 如果链表为空，直接返回空链表
    if (!head) {
        return head;
    }

    let current = head;
    // 遍历链表
    while (current !== null && current.next !== null) {
        //  如果当前节点的值与下一个节点的值相同时，删除下一个节点, 否则移动指针
        if (current.val === current.next.val) {
            current.next = current.next.next;   // 删除操作：通过将当前节点的 next 指针指向下下个节点实现
        } else {
            current = current.next; // 不相等时，移动指针前进
        }
    }

    return head;
};

// 测试
let head = {
    val: 1,
    next: {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 3,
                    next: null
                }
            }
        }
    }
};
console.log(deleteDuplicates(head)); // { val: 1, next: { val: 2, next: { val: 3, next: null } } }