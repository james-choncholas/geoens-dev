import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import statistics as stats
import matplotlib.backends.backend_pdf


def main():
    allexps = ['direct_resolve', '20km_resolve', '630km_resolve']

    for experiment in allexps:

        filename = experiment + '.txt'

        with open(filename) as f:

            df = pd.read_csv(filename)#, header=None)
            #df.info()
            #print ""

            fig_id = 0
            df = df.sort_values(by='Query Time')

            # sorted data
            plt.figure(fig_id)
            plt.plot(df['Query Time'].values.astype(float)*1000)
            plt.xlabel('Query Number')
            plt.ylabel('DNS Query Time (ms)')
            plt.title("All (Sorted) Query Time for Experiment: " + experiment)
            #plt.show()
            pdf = matplotlib.backends.backend_pdf.PdfPages(experiment + "_sorted.pdf")
            pdf.savefig()
            pdf.close()

            # CDF
            fig_id += 1
            plt.figure(fig_id)
            plt.plot(df['Query Time'].values.astype(float)*1000, np.linspace(0, 1, len(df['Query Time']), endpoint=False))
            plt.xlabel('DNS Query Time (ms)')
            plt.ylabel('% of Queries Resolved')
            plt.title("CDF of Query Time for Experiment: " + experiment)
            #plt.show()
            pdf = matplotlib.backends.backend_pdf.PdfPages(experiment + "_cdf.pdf")
            pdf.savefig()
            pdf.close()

if __name__ == "__main__":
  main()
