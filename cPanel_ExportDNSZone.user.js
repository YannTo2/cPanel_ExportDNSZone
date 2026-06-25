// ==UserScript==
// @name         cPanel_ExportDNSZone
// @namespace    https://github.com/YannTo2
// @version      1.4
// @description  Ajoute un bouton d'export d'une zone DNS de l'interface cPanel dans un fichier texte
// @author       YannTo2
// @copyright    2026, YannTo2
// @license      MIT
// @homepageURL  https://github.com/YannTo2
// @supportURL   https://github.com/YannTo2/cPanel_ExportDNSZone/issues
// @source       https://github.com/YannTo2/cPanel_ExportDNSZone
// @grant        none
// @changelog    v1.4: Update - amélioration du parse des enregistrements DNS
// ==/UserScript==
(function()
{
    'use strict';

    function extractDnsRecords()
    {
        const records = [];

        document.querySelectorAll("#table tbody tr.recordTableRow").forEach(row =>
        {
            const name = row.querySelector("td[data-title='Nom'] span")?.innerText.trim();
            const ttl = row.querySelector("td[data-title='TTL'] span")?.innerText.trim();
            const type = row.querySelector("td[data-title='Type'] span")?.innerText.trim();
            const record = row.querySelector("td[data-title='Enregistrement'] div")?.innerText.trim();

            if (name && ttl && type && record)
            {
                records.push({ name, ttl, type, record });
            }
        });

        records.sort((a, b) => a.type.localeCompare(b.type));

        return records;
    }

    function exportToFile(data)
    {
        const lines = ['# Zone DNS Exportée', '', 'Type    Nom                  Valeur                  TTL'];
        data.forEach(record =>
        {
            lines.push(`${record.type}\t${record.name}\t${record.record}\t${record.ttl}`);
        });

        const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'zone-dns-export.txt';
        a.click();

        URL.revokeObjectURL(url);
    }

    function addExportButton()
    {
        const header = document.querySelector("h1.page-header #pageHeading");
        if (header)
        {
            const button = document.createElement('button');
            button.innerText = 'Exporter la zone DNS';
            button.style.marginTop = '10px';
            button.style.backgroundColor = '#ff6918';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px 10px';
            button.style.cursor = 'pointer';
            button.style.borderRadius = "5px";

            button.addEventListener('click', () =>
            {
                const records = extractDnsRecords();
                if (records.length > 0)
                {
                    exportToFile(records);
                }
                else
                {
                    alert('Aucun enregistrement DNS trouvé !');
                }
            });

            header.appendChild(button);
        }
    }

    window.addEventListener('load', () =>
    {
        setTimeout(() =>
        {
            if (document.querySelector("#table"))
            {
                addExportButton();
            }
        }, 2000);
    });
})();
