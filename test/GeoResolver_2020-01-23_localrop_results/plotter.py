import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import statistics as stats
import matplotlib.backends.backend_pdf


def main():
    allexps = ['direct_resolve']#, '20km_resolve', '630km_resolve']
    wc = ["warm", "cold"]

    for generic_experiment in allexps:
        wc_experiments = [generic_experiment+"_warm", generic_experiment+"_cold"];

        for experiment in wc_experiments:
            filename = experiment + '.csv'

            with open(filename) as f:
                df = pd.read_csv(filename)#, header=None)
                #df.info()

                fig_id = 0
                df = df.sort_values(by='query_time')

                # sorted data
                plt.figure(fig_id)
                plt.plot(df['query_time'].values.astype(float)*1000, label=experiment)

                # save pdf of all last experiments
                if (experiment == wc_experiments[-1]):
                    plt.xlabel('Query')
                    plt.ylabel('Time (ms)')
                    plt.title("All (Sorted) GeoENS Query Time Measurements")
                    plt.legend()
                    #plt.show()
                    pdf = matplotlib.backends.backend_pdf.PdfPages(generic_experiment + "_sorted.pdf")
                    pdf.savefig()
                    pdf.close()

                # CDF
                fig_id += 1
                plt.figure(fig_id)
                plt.plot(df['query_time'].values.astype(float)*1000, np.linspace(0, 1, len(df['query_time']), endpoint=False), label=experiment)

                # save pdf of all last experiments
                if (experiment == wc_experiments[-1]):
                    plt.xlabel('Query Time (ms)')
                    plt.ylabel('% of Queries Resolved')
                    plt.title("CDF of GeoENS Query Time")
                    plt.legend()
                    #plt.show()
                    pdf = matplotlib.backends.backend_pdf.PdfPages(generic_experiment + "_cdf.pdf")
                    pdf.savefig()
                    pdf.close()

if __name__ == "__main__":
  main()
