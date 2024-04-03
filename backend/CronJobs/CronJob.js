import cron from 'node-cron'
import { verifyEventDate } from "../controllers/EventController.js" 


// cron.schedule('* * 1-31/1 * *', function(){
//     verifyEventDate()
// });

cron.schedule('* * */1 * *', function(){
    verifyEventDate()
});