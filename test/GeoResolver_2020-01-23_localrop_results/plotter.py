import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import statistics as stats
import matplotlib.backends.backend_pdf


def main():
    sns.set(style="whitegrid")
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
                    plt.xlabel('Query', fontsize=15)
                    plt.ylabel('Time (ms)', fontsize=15)
                    plt.title("All (Sorted) GeoENS Query Time Measurements", fontsize=20)
                    plt.legend()
                    #plt.show()
                    plt.savefig(generic_experiment + "_sorted.pdf")

                # CDF
                fig_id += 1
                plt.figure(fig_id)
                plt.plot(df['query_time'].values.astype(float)*1000, np.linspace(0, 1, len(df['query_time']), endpoint=False), label=experiment)

                # save pdf of all last experiments
                if (experiment == wc_experiments[-1]):
                    plt.xlabel('Query Time (ms)', fontsize=15)
                    plt.ylabel('% of Queries Resolved', fontsize=15)
                    plt.title("CDF of GeoENS Query Time", fontsize=20)
                    plt.legend()
                    #plt.show()
                    plt.savefig(generic_experiment + "_cdf.pdf")

if __name__ == "__main__":
  main()
