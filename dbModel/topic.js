'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let count = 1

const topicSchema = new Schema({
  backgroundUrl: String,
  tid: {
    type: String,
    default: count ++
  },
  topicName: String,
  topicPic: String,
  recommend: String,
  priority: Number
})

topicSchema.statics.sortByPriority = function(topics, cb) {

}

topicSchema.index({
  id: 1
});

const Topic = mongoose.model('Topic', topicSchema, 'topic');

export default Topic
