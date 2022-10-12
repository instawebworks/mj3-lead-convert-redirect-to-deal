import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
const ZOHO = window.ZOHO;

function App() {
    useEffect(() => {
        ZOHO.embeddedApp.on("PageLoad", function (data) {
            console.log(data);
            const entity = data.Entity;
            const entityId = data.EntityId;
            /**
             * Convert Lead
             */
            let request = {
                url: `https://www.zohoapis.com/crm/v2/functions/bcrm_convert_lead_from_widget/actions/execute?auth_type=apikey&zapikey=1003.bb0f6891a2718fb7f54f39f970347d49.b025ed1ad7ca15b0a6acd464966a8318&lead_id=${entityId}`,
            };
            ZOHO.CRM.HTTP.get(request).then(function (data) {
                const accountId = JSON.parse(data)?.Account_ID;
                if (accountId) {
                    window.open(
                        `https://crm.zoho.com/crm/org2248734/tab/Accounts/${accountId}`,
                        "_top"
                    );
                } else {
                    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
                        console.log(data);
                    });
                }
            });
        });

        /*
         * initializing the widget.
         */
        ZOHO.embeddedApp.init();
    }, []);

    return (
        <>
            <h2>
                Lead is converting and redirecting to Account. Please wait......
            </h2>
            {/* <button
                onClick={() => {
                    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
                        console.log(data);
                    });
                }}>
                Cancel
            </button> */}
        </>
    );
}

export default App;
