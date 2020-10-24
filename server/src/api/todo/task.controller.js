const taskModel = require('./task.model');

module.exports = {
    async addTask(req,res){
        try {
            const task = await taskModel.create(req.body);
            return res.json({success:true,data:task});
          } catch (err) {
              return res.json({ success: false, message: "failed to create task",'error':err });
        }
    },
    async getTasks(req,res){
        try {
            const tasks = await taskModel.find({});
            return res.json({success:true,data:tasks});
          } catch (err) {
            return res.json({ success: false, message: "failed to get tasks",'error':err });            
          }
    },
    async getTask(req,res){
        try {
            const task = await taskModel.findById(req.params.id);
            return res.json({success:true,data:task});
          } catch (err) {
            return res.json({ success: false, message: "failed to delete task" });
          }
    },
    async deleteTask(req,res){
        try {
            await taskModel.findByIdAndRemove(req.params.id);
            return res.json({success:true,message:"task deleted!"});
          } catch (err) {
            return res.json({ success: false, message: "failed to delete task" });
          }
    },
    async updateTask(req,res){
        try {
            const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.json({success:true,data:task});
          } catch (err) {
            return res.json({ success: false, message: "failed to update task" });
          }
    }
}