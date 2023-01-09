const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'places' 
    },
    initialDate: {
        type: Date,
        require: true
    },
    finalDate: {
        type: Date,
        require: true
    },
    times: {
        type: Number,
        default: 0
    }

}, {
    versionKey: false
});

clientSchema.statics.getClientsWithGymName = function() {
    return this.aggregate([
      {
        $lookup: {
          from: "places",
          localField: "gym",
          foreignField: "_id",
          as: "gym_info"
        }
      },
      {
        $unwind: "$gym_info"
      },
      {
        $addFields: {
          gym_name: "$gym_info.name"
        }
      },
      {
        $project: {
          gym_info: 0,
          gym: 0,
          phone: 0
        }
      }
    ]);
  }

  clientSchema.statics.getClientsWithGymNameSort = function(typeSort, typeOrder) {
    return this.aggregate([
      {
        $lookup: {
          from: "places",
          localField: "gym",
          foreignField: "_id",
          as: "gym_info"
        }
      },
      {
        $unwind: "$gym_info"
      },
      {
        $addFields: {
          gym_name: "$gym_info.name"
        }
      },
      {
        $project: {
          gym_info: 0,
          gym: 0,
          phone: 0
        }
      },
      {
        $sort :  {[typeSort]: typeOrder}
      }
    ]);
  }

module.exports = model('Client', clientSchema);