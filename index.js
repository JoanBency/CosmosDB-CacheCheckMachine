const prompt = require('prompt');
const cosmosDBConnectionSettings = require("./Json_Files/cosmosDBConnectionSettings.json");
const dataIngestionAndSelection = require('./dataIngestionAndSelection').dataIngestionAndSelection;
const dataUpdationAndSelection = require('./dataUpdationAndSelection').dataUpdationAndSelection;

async function main() {
    prompt.start();
    console.log("\n1. Insert and Print\n2. Update and Print\nEnter your choice...");
    prompt.get(['choice'], function (err, result) {
        if (err) { return onErr(err); }
        switch(result.choice) {
            case '1':   var connectionSettings, connectionMode, partitionMode;
                        connectionSettings = cosmosDBConnectionSettings.cosmosDBDedicatedGatewayNoPartition;
                        connectionMode = "DedicatedGateway";
                        partitionMode = "Single Partition";
                        dataIngestionAndSelection.IngestionAndSelection(connectionSettings, connectionMode, partitionMode, function() {
                            connectionSettings = cosmosDBConnectionSettings.cosmosDBDedicatedGatewayWithPartition;
                            connectionMode = "DedicatedGateway";
                            partitionMode = "Multiple Partition";
                            dataIngestionAndSelection.IngestionAndSelection(connectionSettings, connectionMode, partitionMode, function() {

                            });
                        });
                        function onErr(err) {
                            console.log(err);
                            return 1;
                          }
                        break;
            case '2':   var connectionSettings, connectionMode, partitionMode;
                        connectionSettings = cosmosDBConnectionSettings.cosmosDBDedicatedGatewayNoPartition;
                        connectionMode = "DedicatedGateway";
                        partitionMode = "Single Partition";
                        dataUpdationAndSelection.UpdationAndSelection(connectionSettings, connectionMode, partitionMode, function() {
                            connectionSettings = cosmosDBConnectionSettings.cosmosDBDedicatedGatewayWithPartition;
                            connectionMode = "DedicatedGateway";
                            partitionMode = "Multiple Partition";
                            dataUpdationAndSelection.UpdationAndSelection(connectionSettings, connectionMode, partitionMode, function() {

                            });
                        });
                        function onErr(err) {
                            console.log(err);
                            return 1;
                          }
                        break;
            default :   console.log("Wrong Entry");

        }
    });
    function onErr(err) {
        console.log(err);
        return 1;
    } 
}

main();