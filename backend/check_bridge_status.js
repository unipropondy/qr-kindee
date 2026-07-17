const { poolPromise } = require("./config/db");

async function run() {
  const pool = await poolPromise;
  
  // Select the last 5 logs from PrintJobQueue or check recent status
  const res = await pool.request().query("SELECT TOP 5 JobId, StoreId, PrinterName, Status, ProcessedOn, CompletedOn FROM PrintJobQueue ORDER BY CreatedOn DESC");
  console.log("Recent print jobs in queue:", res.recordset);
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
