// components/watch/watch.js
Component({
  properties: {
    curriculumName: String
  },
  lifetimes: {
    attached: function () {
      console.log('在组件实例进入页面节点树', this.curriculumName)
    },
  },
  observers: {
    'curriculumName': function (curriculumName) {
      console.log(curriculumName)
    }
  }
})
