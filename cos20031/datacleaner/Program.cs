using System;
using System.Collections.Generic;
using System.IO;
using Record = System.Collections.Generic.List<string>;

namespace DataCleaner {

    public class Program {
        static void Main(string[] args) {
            if (args.Length < 2) {
                Console.WriteLine("Please specify the path to the CSV you want to clean and at least one unique column.");
                return;
            }

            string[] uniqueColumns = new string[args.Length - 1];
            for (int i = 1; i < args.Length; i++) {
                uniqueColumns[i - 1] = args[i];
            }

            try {
                List<Record> records = ParseFile(args[0]);
                Dictionary<string, int> columnDictionary = GetColumnDictionary(records);

                Sort(records, columnDictionary, uniqueColumns);
                
                List<Record> filteredRecords = RemoveDuplicates(records, columnDictionary, uniqueColumns);

                string[] inputSegments = args[0].Split(".");
                inputSegments[inputSegments.Length - 2] = inputSegments[inputSegments.Length - 2] + " - clean";

                string outputFile = String.Join(".", inputSegments);
                WriteRecordsToCSV(filteredRecords, outputFile);

                Console.WriteLine($"Removed {records.Count - filteredRecords.Count} duplicate(s).");
            } catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        static List<Record> ParseFile(string fileName) {
            List<Record> records = new List<Record>();

            using (StreamReader reader = new StreamReader(fileName)) {
                string? record;

                while ((record = reader.ReadLine()) != null) {
                    records.Add(new Record(record.Split(",")));
                }

                return records;
            }
        }

        static Dictionary<string, int> GetColumnDictionary(List<Record> records) {
            Dictionary<string, int> dictionary = new Dictionary<string, int>();

            if (records.Count >= 1) {
                Record headerRow = records[0];

                for (int i = 0; i < headerRow.Count; i++) {
                    dictionary[headerRow[i]] = i;
                }
            }

            return dictionary;
        }

        static void Sort(List<Record> records, Dictionary<string, int> columnDictionary, string[] uniqueColumns) {
            int min;

            // We skip the first record which is a header row, hence we start at i = 1.
            for (int i = 1; i < records.Count - 1; i++) {
                min = i;

                for (int j = i + 1; j < records.Count; j++) {
                    if (Compare(records[min], records[j], columnDictionary, uniqueColumns) == 1) {
                        min = j;
                    }
                }

                Record temp = records[i];
                records[i] = records[min];
                records[min] = temp;
            }
        }

        static int Compare(Record recordA, Record recordB, Dictionary<string, int> columnDictionary, string[] uniqueColumns) {
            foreach (string column in uniqueColumns) {
                int columnIndex = columnDictionary[column];
                int comparison = String.Compare(recordA[columnIndex], recordB[columnIndex]);

                if (comparison != 0) {
                    return comparison;
                }
            }

            return 0;
        }

        static List<Record> RemoveDuplicates(List<Record> records, Dictionary<string, int> columnDictionary, string[] uniqueColumns) {
            List<Record> filteredRecords = new List<Record>();

            if (records.Count == 0) {
                return filteredRecords;
            }

            // Add the header row.
            filteredRecords.Add(records[0]);

            // If the CSV file contain any data.
            if (records.Count > 1) {    
                // The index of the first data row.            
                int lastUniqueRecordIndex = 1;
                filteredRecords.Add(records[lastUniqueRecordIndex]);

                for (int i = lastUniqueRecordIndex + 1; i < records.Count; i++) {
                    if (Compare(records[lastUniqueRecordIndex], records[i], columnDictionary, uniqueColumns) != 0) {
                        lastUniqueRecordIndex = i;
                        filteredRecords.Add(records[i]);
                    } else {
                        Console.WriteLine("Duplicate: " + String.Join(",", records[i]));
                    }
                }
            }

            return filteredRecords;
        }

        static void WriteRecordsToCSV(List<Record> records, string fileName) {
            using (StreamWriter writer = new StreamWriter(fileName)) {
                for (int i = 0; i < records.Count; i++) {
                    writer.Write(String.Join(",", records[i]));

                    if (i != records.Count - 1) {
                        writer.WriteLine("");
                    }
                }
            }
        }
    }
}