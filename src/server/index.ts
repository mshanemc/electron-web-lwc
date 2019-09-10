import { Express } from 'express';
import { Pool } from 'pg';

const { DATABASE_URL } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL
});

export default function(app: Express): void {
    // put your express app logic here
    app.get('/some/api', (req, res) => {
        // do stuff
        res.json({ status: 'yay' });
    });

    app.post('/testdrive', async function(req, res, next) {
        console.log('routing on post form');
        console.log(req.body);
        const result = await pool.query(
            `insert into salesforce.Test_Drive__c(First_Name__c, Last_Name__c, Phone__c, Email__c, Model__c, Location__c) Values ('${req.body.firstname}', '${req.body.lasttname}', '${req.body.phone}', '${req.body.email}', '${req.body.model}', '${req.body.location}')`
        );
        console.log(result);
        res.render('testdrive', { success: true });
    });
}
